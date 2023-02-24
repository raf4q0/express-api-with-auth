import mongoose from 'mongoose'
import { 
  DB_NAME,
  DB_HOSTNAME,
  DB_USERNAME,
  DB_PASSWORD
} from './environment'

const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}/${DB_NAME}?retryWrites=true&w=majority`

export const connectToDatabase = async () => {
  try {
    await mongoose.set('strictQuery', false).connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Conexión a la base de datos establecida con éxito')
  } catch (error) {
    console.error('Error al conectarse a la base de datos:', error)
  }
}
