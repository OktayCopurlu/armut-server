export const cantonAndCategoryResolvers = {
  Query: {
    getAllCategories: async (_, args, { AllCategories }) => {
      const allCategories = await AllCategories.find();
      return allCategories;
    },
    getServiceCategory: async (_, mainCategory, { ServiceCategory }) => {
      const category = await ServiceCategory.find(mainCategory);
      return category;
    },

    getCantons: async (_, args, { Canton }) => {
      const cantons = await Canton.find();
      return cantons;
    },
    getCities: async (_, { canton }, { Canton }) => {
      const cities = await Canton.find({ canton });
      return cities;
    },
  },

  Mutation: {
    setUpCanton: async (_, { canton, gemainde }, { Canton }) => {
      const cantons = await new Canton({
        canton,
        gemainde,
      }).save();
      return cantons;
    },

    setUpCategories: async (_, { name, categories }, { AllCategories }) => {
      await new AllCategories({
        name,
        categories,
      }).save();
      return {
        AllCategories,
      };
    },
  },
};
