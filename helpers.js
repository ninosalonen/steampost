const delay = (minutes) =>
  new Promise((res) => setTimeout(res, minutes * 60000))

exports.delay = delay
