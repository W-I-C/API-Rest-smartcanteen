
/**
 * @module removeMealsCartService
 */
require('dotenv').config();
import { createClient } from "../../../config/db";
import { hash } from "bcrypt";
import { IUser } from "../../../models/IUsers";

/**
 * class responsible for registering a user
 */
export class RegisterService {
  /**
     * Method that allows you to register a user
     * @param roleid role id
     * @param preferredcampus preferred campus
     * @param preferredbar preferred bar
     * @param email email
     * @param name name
     * @param password password
     * @param schoolno school number
     * @param birthdate birthdate
     * @param imgurl profile picture url
     */
  async execute({
    roleid, preferredcampus, preferredbar, email, name, password, schoolno, birthdate, imgurl
  }: IUser) {


    const registerDBClient = createClient();
    const emailQuery = await registerDBClient.query('SELECT * from users WHERE email=$1 ', [email])
    if (emailQuery['rows'].length >= 1) {
      throw new Error("Email already registered")
    }
    const schoolnoQuery = await registerDBClient.query('SELECT * from users WHERE schoolno=$1 ', [schoolno])
    if (schoolnoQuery['rows'].length >= 1) {
      throw new Error("School number already registered")
    }

    //password encryption
    let passwd = await hash(password, 8);

    await registerDBClient.query(`INSERT INTO users(roleid, preferredcampus, preferredbar, email, name, password, schoolno, birthdate, imgurl)
                                   VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [roleid, preferredcampus, preferredbar, email, name, passwd, schoolno, birthdate, imgurl])

    return { status: 200, data: { msg: "User Registered Successfully" } }
  }
}