import { v2 as cloudinary } from 'cloudinary'
import { env } from './environment.config'

cloudinary.config({
  cloud_name: env.cloudinary.cloud_name,
  api_key: env.cloudinary.key,
  api_secret: env.cloudinary.secret
})

export default cloudinary
