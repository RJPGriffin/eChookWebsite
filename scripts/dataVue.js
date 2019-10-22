var loginApp = new Vue({
  el: '#login-app',
  data: {
    teamCode: "",
    validCode: 0,
    pastLogins: [],
    snippets: {
      loginMessage: "Enter Team Code",
      clearText: "Clear History",
      title: "Live Data Login",
      codeReq: "Enter Team and Car Details"
    },
    screens: {
      login: 1,
      register: 0
    }
  },
  mounted() {
    if (localStorage.logins) {
      this.pastLogins = JSON.parse(localStorage.logins);
      console.log(`Logins found: ${JSON.stringify(this.pastLogins)}`);
    }

  },
  watch: {
    teamCode: function() {
      let check = 1;
      if (this.teamCode.length === 0) {
        this.snippets.loginMessage = "Enter Team Code";
        check = 0;
      }
      if (this.teamCode.length < 8 && this.teamCode.length > 0) {
        check = 0;
        this.snippets.loginMessage = "Too Short"
      }
      regexp = /^[A-Za-z0-9]+$/;
      if (this.teamCode.length > 0 && !regexp.test(this.teamCode)) {
        check = 0;
        this.snippets.loginMessage = "Invalid Characters (A-Z, 1-9 only)"
      }

      if (check) {
        this.snippets.loginMessage = "Go!";
      }
      this.validCode = check
    }
  },
  computed: {

  },
  methods: {
    newLogin: function() {
      if (this.validCode) {
        console.log(`Loging in with code ${this.teamCode}`);
        let matched = 0;
        for (const login of this.pastLogins) {
          if (login.code === this.teamCode) {
            matched = 1;
          }
        }
        if (!matched) {
          let obfuscated = this.teamCode.charAt(0) + "******" + this.teamCode.charAt(7);
          this.pastLogins.push({
            car: "Test Car",
            code: this.teamCode,
            codeObs: obfuscated,
            team: "team"
          })
          localStorage.logins = JSON.stringify(this.pastLogins)
        }
      }
    },
    prevLogin: function(i) {
      let code = this.pastLogins[i].code;
      console.log(`Login with code: ${code}`);
    },
    clearHistory: function() {
      if (this.snippets.clearText === "Clear History") {
        this.snippets.clearText = "Definitely Clear History?";
      } else {
        this.snippets.clearText = "Clear History"
        this.pastLogins = [];
        localStorage.logins = [];
      }
    },
    toRegistration: function() {
      this.snippets.title = "Get your codes here!"
      this.screens.login = 0;
      this.screens.register = 1;
    },
    toLogin: function() {
      this.snippets.title = "Live Data Login"
      this.screens.login = 1;
      this.screens.register = 0;
    }
  }
})