import axios from 'axios';
let timer;
export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
  },
  async logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
    clearTimeout(timer);
    context.commit('logout');
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZmbrqexC-hTORf8LjqXRsvqggD9x9Dew';
    if (mode == 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZmbrqexC-hTORf8LjqXRsvqggD9x9Dew';
    }
    const response = await axios.post(url, {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true
    });
    const data = response.data;
    if (!(response.statusText == 'OK')) {
      const error = new Error(data.message || 'Failed to authenticate');
      console.log(error);
      throw error;
    }
    const expiresIn = +data.expiresIn * 1000;

    const expirationDate = new Date().getTime() + expiresIn;
    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function() {
      context.dispatch('logout');
    }, expiresIn);

    context.commit('setUser', {
      token: data.idToken,
      userId: data.localId
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const expiresIn = +tokenExpiration - new Date().getTime();
    if (expiresIn < 10) {
      return;
    }
    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);
    setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);
    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId
      });
    }
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('didAutologout');
  }
};
