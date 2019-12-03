import bcrypt from 'bcryptjs';

const bcrypthash = {

  hashpassword: (pass) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    return hash;
  },
  comparepassword: (userpass, dbpass) => {
    const isTrue = bcrypt.compareSync(userpass, dbpass);
    return isTrue;
  },
};

export default bcrypthash;
