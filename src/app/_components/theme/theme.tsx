const PrimaryThemes = {
  Dark:  { id: 1, label: "Dark",  colors: [] },
  Light: { id: 2, label: "Light", colors: [] },
}

const SecondaryThemes = {
  DarkRed:   { id: 1, label: "Dark Red",   colors: [ "#AA0000", "#BB3232", "#CC6666", "#DD9999", "#EECCCC" ] },
  Red:       { id: 2, label: "Red",        colors: [ "#FF5555", "#FF7676", "#FF9999", "#FFBBBB", "#FFDDDD" ] },
  Orange:    { id: 3, label: "Orange",     colors: [ "#FFAA00", "#FFBB32", "#FFCC66", "#FFDD99", "#FFEECC" ] },
  Yellow:    { id: 4, label: "Yellow",     colors: [ "#FFFF55", "#FFFF76", "#FFFF99", "#FFFFBB", "#FFFFDD" ] },
  DarkGreen: { id: 5, label: "Dark Green", colors: [ "#00AA00", "#32BB32", "#66CC66", "#99DD99", "#CCEECC" ] },
  Green:     { id: 6, label: "Green",      colors: [ "#55FF55", "#76FF76", "#99FF99", "#BBFFBB", "#DDFFDD" ] },
  DarkAqua:  { id: 7, label: "Dark Aqua",  colors: [ "#00AAAA", "#32BBBB", "#66CCCC", "#99DDDD", "#CCEEEE" ] },
  Aqua:      { id: 8, label: "Aqua",       colors: [ "#55FFFF", "#76FFFF", "#99FFFF", "#BBFFFF", "#DDFFFF" ] },
  DarkBlue:  { id: 9, label: "Dark Blue",  colors: [ "#0000AA", "#3232BB", "#6666CC", "#9999DD", "#CCCCEE" ] },
  Blue:      { id: 10, label: "Blue",      colors: [ "#5555FF", "#7676FF", "#9999FF", "#BBBBFF", "#DDDDFF" ] },
  Pink:      { id: 11, label: "Pink",      colors: [ "#FF55FF", "#FF76FF", "#FF99FF", "#FFBBFF", "#FFDDFF" ] },
  Purple:    { id: 12, label: "Purple",    colors: [ "#AA00AA", "#BB32BB", "#CC66CC", "#DD99DD", "#EECCEE" ] },
}

let DefaultPrimaryTheme = PrimaryThemes.Dark;
let DefaultSecondaryTheme = SecondaryThemes.Blue;