import bcrypt from 'bcryptjs';

const bcrypthash = {

  hashpassword: (pass) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    return hash;
  },
  comparepassword: async (userpass, dbpass) => {
    try {
      const isTrue = await bcrypt.compareSync(userpass, dbpass);
      console.log(isTrue);
      return isTrue;
    } catch (err) {
      return err;
    }
  },
};

export default bcrypthash;
