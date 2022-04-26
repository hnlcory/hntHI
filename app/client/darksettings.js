const options = {
  bottom: '64px', // default: '32px'
  right: '32px', // default: '32px'
  left: 'unset', // default: 'unset'
  time: '0.3s', // default: '0.3s'
  mixColor: '#e1e1e1', // default: '#fff'
  backgroundColor: '#fff', // default: '#fff'
  buttonColorDark: '#181A1B', // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: true, // default: true,
  label: '🌓', // default: ''
  autoMatchOsTheme: false, // default: true
};

// eslint-disable-next-line no-undef
const darksettings = new Darkmode(options);
darksettings.showWidget();
