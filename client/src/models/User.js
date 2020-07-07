function fakeAuth(auth) {
  if (auth.username === "name" && auth.password === "pass") {
    return {
      id: "1",
      username: "James",
      type: 0,
      email: "email@email.com",
      dob: new Date("August 1, 1980"),
      balance: 10000,
      games_played: 10,
      wins: 3,
      losses: 7,
      credit_cards: [1, 2, 3]
    };
  } else {
    return 404;
  }
}

const user_types = {
  0: "regular user",
  1: "moderator"
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

    this.userdata = userdata;
    return this;
  }

  // getters --------------------------

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