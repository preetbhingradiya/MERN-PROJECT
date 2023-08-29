class ErrorHendler extends Error {
  constructor(message, satuscode) {
    super(message, satuscode);
    this.satuscode = satuscode;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports=ErrorHendler