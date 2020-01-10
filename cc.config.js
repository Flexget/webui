module.exports = {
  parserOpts: {
    headerPattern: /^\[?(\w*)(\]:?|:)\s*(.*)$/,
    headerCorrespondence: [
      'tag',
      'bracket',
      'message'
    ]
  }
}
