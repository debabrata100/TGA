import { Job, Company, Post, User } from "./db.js";
import { PubSub } from "graphql-subscriptions";

const pubSub = new PubSub();
const COMPANY_ADDED = "COMPANY_ADDED";
const JOB_ADDED = "JOB_ADDED";
const COMPANY_REMOVED = "COMPANY_REMOVED";
const JOB_REMOVED = "JOB_REMOVED";

const PostStatus = {
  draft: "DRAFT",
  published: "PUBLISHED",
  inactive: "INACTIVE",
  archived: "ARCHIVED",
};

export const resolvers = {
  Query: {
    job: (root, { id }) => {
      console.log(id);
      return Job.findById(id);
    },
    jobs: async () => {
      return Job.findAll();
    },
    companies: async () => Company.findAll(),
    users: async () => User.findAll(),
    posts: async () => Post.findAll(),
  },
  Job: {
    company: async (job, args, cv, info) => {
      const requestedFields = info.fieldNodes[0].selectionSet.selections.map(
        (field) => field.name.value
      );

      // Log the requested fields
      console.log("Requested fields:", requestedFields);
      return await Company.findById(job.companyId);
    },
  },
  User: {
    posts: async () => await Post.findAll(),
  },
  Mutation: {
    addCompany: async (_, { input }) => {
      const { name, description } = input;
      const company = await Company.create({
        name,
        description,
      });
      pubSub.publish(COMPANY_ADDED, { companyAdded: company });
      return company;
    },
    deleteCompany: async (_, { id }) => {
      const company = await Company.delete(id);
      pubSub.publish(COMPANY_REMOVED, { companyRemoved: company });
      return company;
    },
    addJob: async (_, { input }) => {
      const { companyId, title, description } = input;
      const job = await Job.create({
        companyId,
        title,
        description,
      });
      pubSub.publish(JOB_ADDED, { jobAdded: job });
      return job;
    },
    deleteJob: async (_, { id }) => {
      const job = await Job.delete(id);
      pubSub.publish(JOB_REMOVED, { jobRemoved: job });
      return job;
    },
    addPost: async (_, { input: { title, description } }) => {
      const post = await Post.create({
        title,
        description,
        createdAt: new Date().toDateString(),
        status: PostStatus.draft,
      });
      return post;
    },
    updatePost: async (_, { id, status }) => {
      const post = Post.update({ id, status });
      return post;
    },
  },
  Subscription: {
    companyAdded: {
      subscribe: () => pubSub.asyncIterator([COMPANY_ADDED]),
    },
    jobAdded: {
      subscribe: () => pubSub.asyncIterator([JOB_ADDED]),
    },
    companyRemoved: {
      subscribe: () => pubSub.asyncIterator([COMPANY_REMOVED]),
    },
    jobRemoved: {
      subscribe: () => pubSub.asyncIterator([JOB_REMOVED]),
    },
  },
};
