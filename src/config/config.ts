export default class Config {
  public static endpoint: string =
    process.env.ENDPOINT_URL || 'http://localhost:9090';
}
