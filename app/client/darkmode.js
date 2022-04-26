const options = {
  bottom: '64px', // default: '32px'
  right: '32px', // default: '32px'
  left: 'unset', // default: 'unset'
  time: '0.3s', // default: '0.3s'
  mixColor: '#eaeaea', // default: '#fff'
  backgroundColor: '#ffffff', // default: '#fff'
  buttonColorDark: '#181A1B', // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: true, // default: true,
  label: '🌓', // default: ''
  autoMatchOsTheme: false, // default: true
};

// eslint-disable-next-line no-undef
const darkmode = new Darkmode(options);
darkmode.showWidget();
