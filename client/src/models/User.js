import moment from 'moment';

function fakeAuth(auth) {
  if (auth.username === "name" && auth.password === "pass") {
    return {
      id: "1",
      username: "name",
      type: 0,
      email: "email@email.com",
      dob: moment("August 1, 1980"),
      balance: 10000,
      games_played: 10,
      wins: 3,
      losses: 7,
      credit_cards: [1, 2, 3]
    };
  } else if (auth.username === "admin" && auth.password === "pass") {
    return {
      id: "0",
      username: "admin",
      type: 1,
      email: "email@email.com",
      dob: moment("July 1, 1900"),
      balance: 100,
      games_played: 15,
      wins: 10,
      losses: 5,
      credit_cards: []
    };
  } else{
    return 404;
  }
}

function fakeCreate(data) {
  if (data.email === "this@email.com") {
    return 1;
  } else if (data.username === "user") {
    return 2;
  }
  return 'userid-222222';
}

const user_types = {
  0: "Regular User",
  1: "Moderator"
}

// pages: [login_register, match, store, leaderboard, news, management, user_info(always false)]

const display_array = {
  9: [true, false, false, false, true, false, false],
  0: [false, true, true, true, true, false, false],
  1: [false, true, true, true, true, true, false]
}

class User {
  
  constructor() {
    this.userdata = {};
    this.userdata.type = 9;
  }

  login(auth) {
    // @TODO: add real auth

    let userdata = fakeAuth(auth);
    if (userdata === 404) throw new Error("Incorrect username & password combination.");

    const user_new = new User();
    user_new.userdata = userdata;

    return user_new;
  }

  create(data) {
    // @TODO: add real create
    let result = fakeCreate(data);

    if (result === 1) {
      throw new Error("email-duplicate");
    } else if (result === 2) {
      throw new Error("username-duplicate");
    }

    const user_new = new User();
    user_new.userdata = {
      username: data.username,
      id: result,
      type: 0,
      email: data.email,
      dob: data.dob,
      balance: 0,
      games_played: 0,
      wins: 0,
      losses: 0
    };

    return user_new;
  }

  logout() {
    // @TODO: add real logout
    return true;
  }

  // getters --------------------------
  // avatar link: https://postimg.cc/3yXpjKCC

  get avatar_url() { return 'https://i.postimg.cc/0N3fsjz3/IMGBIN-giant-panda-dog-cat-avatar-png-Gus-CAj6v.png'; }
  get name() { return this.userdata.username; }
  get id() { return this.userdata.id; }
  get raw_type() { return this.userdata.type; }
  get type() { return user_types[this.userdata.type]; }
  get email() { return this.userdata.email;}
  get dob() { return this.userdata.dob; }
  get balance() { return this.userdata.balance }
  get games_played() { return this.userdata.games_played }
  get wins() { return this.userdata.wins }
  get losses() { return this.userdata.losses }
  get display_setting() { return display_array[this.userdata.type]; }

}

export default User;