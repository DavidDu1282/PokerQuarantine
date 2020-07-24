import moment from "moment";
import axios from "axios";
import { Buffer } from "buffer";

const user_types = {
  0: "Regular User",
  1: "Moderator",
};

// pages: [login_register, match, store, leaderboard, news, management, user_info(always false)]

const display_array = {
  9: [true, false, false, false, true, false, false],
  0: [false, true, true, true, true, false, false],
  1: [false, true, true, true, true, true, false],
};

class User {
  constructor() {
    this.userdata = {};
    this.userdata.role = 9;

    // bind async
    this.updateAvatar = this.updateAvatar.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
  }

  async cookieLogin(data) {
    const user_new = new User();
    user_new.userdata = data;

    return user_new;
  }

  async login(auth) {
    const authdata = {
      email: auth.username,
      password: auth.password,
    };

    return axios
      .post("/api/login", authdata)
      .then((res) => {
        const user_new = new User();
        user_new.userdata = res.data;

        return user_new;
      })
      .catch((err) => {
        throw new Error("Incorrect email & password combination.");
      });
  }

  async handleCreate(data) {
    return axios
      .post("/api/signup", {
        email: data.email,
        password: data.password,
        name: data.username,
        dob: data.dob.toDate(),
      })
      .then((res) => {
        const user_new = new User();
        user_new.userdata = {
          id: res.data,
          email: data.email,
          name: data.username,
          dob: data.dob.toDate(),
          role: 0,
          balance: 0,
          games_played: 0,
          wins: 0,
          losses: 0,
          avatar_url: "",
        };

        return user_new;
      })
      .catch((err) => {
        throw err;
      });

    //else if (result === 2) {
    //throw new Error("username-duplicate");
    //}
  }

  async create(data) {
    return await axios
      .post("/api/check_email", { email: data.email })
      .then((res) => {
        return this.handleCreate(data);
      })
      .catch((err) => {
        throw new Error("email-duplicate");
      });
  }

  async logout() {
    // @TODO: add real logout

    return axios.get("/api/logout").then((res) => {
      return new User();
    });
  }

  async updateAvatar(img) {
    /**
     * Updates the user avatar
     * -----------------------------
     * params:
     *  imgData: the img data chosen from browser
     *
     * returns:
     *  new User
     *
     * errs:
     *  Error('no input')
     */

    // check if imgData is not null
    if (img == null) throw new Error("no input");

    var imgBuffer;
    // make request
    try {
      imgBuffer = Buffer.from(await img.arrayBuffer());
    } catch (err) {
      console.log(err);
      throw err;
    }

    try {
      var imgData = {
        id: this.userdata.userId,
        img: imgBuffer,
      };

      const new_avatar_url = await axios({
        url: "/api/config/avatar",
        method: "POST",
        data: imgData,
      });

      // return new updated user

      const user_new = new User();
      user_new.userdata = Object.assign({}, this.userdata);
      user_new.userdata.avatar_url = new_avatar_url.data;

      return user_new;
    } catch (err) {
      throw err;
    }
  }
  updateEmail(newEmail) {
    /**
     * Updates the user email
     * -----------------------------
     * params:
     *  newEmail: updated email
     *
     * returns:
     *  new User
     *
     * errs:
     *  Error('no input')
     */
    let user_new = new User();

    user_new.userdata = Object.assign({}, this.userdata);
    user_new.userdata.email = newEmail;

    return user_new;
  }

  async delete() {
    /**
     * deletes the user
     * -----------------------------
     *
     * returns:
     *  new User if succesful
     *  void if not
     */

    try {
      await axios.post("/api/config/delete", {
        id: this.userdata.userId,
      });

      return new User();
    } catch (err) {
      throw err;
    }
  }

  // getters --------------------------

  get avatar_url() {
    return this.userdata.avatar_url;
  }
  get name() {
    return this.userdata.name;
  }
  get id() {
    return this.userdata.userId;
  }
  get raw_type() {
    return this.userdata.role;
  }
  get type() {
    return user_types[this.userdata.role];
  }
  get email() {
    return this.userdata.email;
  }
  get dob() {
    return moment(this.userdata.dob);
  }
  get balance() {
    return this.userdata.balance;
  }
  get games_played() {
    return this.userdata.games_played;
  }
  get wins() {
    return this.userdata.wins;
  }
  get losses() {
    return this.userdata.losses;
  }
  get display_setting() {
    return display_array[this.userdata.role];
  }
}

export default User;
