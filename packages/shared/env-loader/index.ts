import path from 'path'
import dotenvFlow from 'dotenv-flow'

export const loadRootEnv = (): void => {
  const rootDir = path.resolve(__dirname, '../../..')
  
  dotenvFlow.config({
    node_env: process.env.NODE_ENV,
    default_node_env: 'development',
    path: rootDir,
    silent: false
  })
  
  console.log(`Loaded environment from: ${rootDir}`)
  console.log('NODE_ENV:', process.env.NODE_ENV)
}

export const getEnvVar = (key: string, defaultValue?: string): string => {
  return process.env[key] || defaultValue || ''
}
