const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
})

const resolvers = {
  Query: {
    async getResource(_, { public_id }) {
      const files = await cloudinary.api.resources({ type: 'upload', prefix: 'megastar/' }, (err, res) => {
        return res
      })
      return files.resources
    },
    async getResources(_, { public_ids }) {
      const files = await cloudinary.api.resources({ type: 'upload', prefix: 'megastar/' }, (err, res) => {
        return res
      })
      return files.resources
    }
  },
  Mutation: {
    uploadSingleResource(_, {input}) {
      console.log('file uploaded to server')
      console.log(req.file)
    }
  }
}

module.exports = resolvers
