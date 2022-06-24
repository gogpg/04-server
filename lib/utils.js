////bendrinio pobudzio darbines funkcijos

const utils = {};

utils.fileExtension = (URL) => {
   return URL.split('.')[1];
}

utils.parseJSONtoObject = (str) => {   //gausime stringa. try/catch apsaugo serveri nuo kritiniu klaidu.
   try {
       return [false, JSON.parse(str)];  ///nera klaidos, gauname duomenis tokius, kokiu reikia.
   } catch (error) {
       return [true, 'ERROR'];         //rasta klaida, error pranesimas.
   }
}

export { utils };

