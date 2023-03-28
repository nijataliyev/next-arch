import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, SetStateAction } from 'react';
import JWT from "jwt-simple";

export const encodeURL = (payload: any) => {
  return JWT.encode(payload, 'xxx')
}
export const decodeURL = (payload: string) => {
  return JWT.decode(payload, 'xxx')
}

export const convertToBase64 = (file: any) => {
  return new Promise(async (resolve, reject) => {
    if (file) {
      if (typeof file?.url === 'string') {
        await urlToBase64(file.url).then((res: any) => {
          resolve(extractBase64(res));
        });
      } else {
        const blob = file.file;
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function() {
          if (typeof reader.result === 'string') {
            resolve(extractBase64(reader.result));
          } else {
            console.error('Base64 extract edilə bilmədi');
            reject('Base 64 extract edilə bilmədi');
          }
        };
        reader.onerror = function(error) {
          reject(null);
        };
      }
    } else {
      console.warn('<input types="file"> is empty please choose file to convert!');
      reject(null);
    }
    /**
     * Extract Base64 from url string (JS & TS)
     * Lambda Extractor
     * @param urlStr: string
     * @returns {string}
     */
  });
};
const extractBase64 = (urlStr: string) => urlStr.split(',')[1];


export const urlToBase64 = (url: string) => {
  return fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }));
};

export const debounce = (func: any, wait: number) => {
  let timeout: any;
  return function executedFunction(...args: any) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const generateGuid = () => {
  let dt = new Date().getTime();
  const guid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return guid;
};


export const recursiveLister = (rows: any[], childColumn: string = '', superParentValue: any = null) => {
  const parents: any[] = [];
  const noParent: any[] = [];
  const arr = JSON.parse(JSON.stringify(rows));
  arr.forEach((item: any, index: number) => {
    if (item[childColumn] !== superParentValue) {
      if (arr.find((it: any) => it.id === item[childColumn])) {
        arr.forEach((datum: any) => {
          if (datum.id === item[childColumn]) {
            if (datum.children && Array.isArray(datum.children)) {
              datum.children.push(item);
            } else {
              datum.children = [item];
            }
          }
        });
      } else {
        noParent.push(item);
      }
    }
  });
  arr.forEach((item: any) => {
    if (item[childColumn] === superParentValue) {
      parents.push(item);
    }
  });
  noParent.forEach(item => {
    parents.push(item);
  });
  return parents;
};

export function changePassVisibility(input: any, callback: any) {
  callback((prev: any) => {
    const prevInput = { ...prev.inputs[input] };
    prevInput.visible = !prevInput.visible;
    return {
      ...prev,
      inputs: {
        ...prev.inputs,
        [input]: prevInput,
      },
    };
  });

}

export function mapFormItems(inputs: any, callback: any, validCallback: any) {
  return Object.keys(inputs).map((input, index) => {
    let currentInput: any = inputs[input];
    if (currentInput.type === 'select') {
      return <div key={currentInput.label + index} className={`pt-10 pb-15`}>
        <label className={`r-label`}>{currentInput.label}</label>
        <select onChange={(e) => {
          changeInputValue(e, input, inputs, callback);
        }
        }
                onBlur={(e) => {
                  inputBlur(e, input, inputs, callback, validCallback);
                }
                }
                value={currentInput.value} className={`r-select `}>
          {currentInput.options.map((opt: any,index: number) => {
            return <option key={index} value={opt.value}>{opt.title}</option>;
          })}
        </select>
        <span className={'err-txt'}>
                        {!currentInput.isValid && currentInput.touched ? currentInput.currentErr : null}
                    </span>
      </div>;
    } else if (currentInput.type === 'textarea') {
      return <div key={currentInput.label + index} className={` pt-10 pb-15`}>
        {currentInput.icon ? <FontAwesomeIcon className=''
                                              icon={currentInput.icon} /> : null}

        <label className={'r-label'}>{currentInput.label}</label>
        <textarea onChange={(e) => {
          changeInputValue(e, input, inputs, callback);
        }
        }
                  onBlur={(e) => {
                    inputBlur(e, input, inputs, callback, validCallback);
                  }
                  }
                  className={`r-textarea`}>
                    {currentInput.value}
                </textarea>
        <span className={'err-txt'}>
                        {!currentInput.isValid && currentInput.touched ? currentInput.currentErr : null}
                    </span>
      </div>;
    } else {
      return <div key={currentInput.label + index} className={` pt-10 pb-15`}>
        <label className={'r-label'}>{currentInput.label}</label>
        {currentInput.type === 'password' ?
          <input onChange={(e) => {
            changeInputValue(e, input, inputs, callback);
          }}
                 onBlur={(e) => {
                   inputBlur(e, input, inputs, callback, validCallback);
                 }
                 }
                 type={currentInput.visible ? 'text' : 'password'} className={`r-input mt-8 px-45 py-13`}
                 placeholder={currentInput.placeholder} />
          :
          <input onChange={(e) => {
            changeInputValue(e, input, inputs, callback);
          }}
                 onBlur={(e) => {
                   inputBlur(e, input, inputs, callback, validCallback);
                 }
                 }
                 type={currentInput.type} className={`r-input mt-8 px-45 py-13`}
                 placeholder={currentInput.placeholder} />
        }
        <span className={'err-txt'}>
                        {!currentInput.isValid && currentInput.touched ? currentInput.currentErrTxt : null}
                    </span>
      </div>;
    }
  });
}

export function changeInputValue(event: ChangeEvent<any> | { target: { value: string } }, input: string, state: any, callback: any, index?: number, stateKey: string = 'inputs') {
  if (index !== undefined && !isNaN(index)) {
    callback((prev: any) => {
      const prevState = prev[index];
      const prevInputState = { ...prevState[stateKey] };
      const prevInput = { ...prevInputState[input] };
      prevInput.value = event.target.value;
      prevInput.touched = true;
      prevInput.isValid = checkInputValidation(prevInput.value, prevInput.rules, prevInput, prevInputState);
      let formValid = true;
      Object.keys(prevInputState).map(item => {
        if (item !== input) {
          formValid = prevInputState[item].isValid && formValid;
        } else {
          formValid = prevInput.isValid && formValid;
        }
      });
      prevInputState[input] = prevInput;
      prevState[stateKey] = prevInputState;
      const newState = [...prev];
      newState[index] = { ...prevState, formValid };
      return [...newState];
    });
  } else {
    callback((prev: any) => {
      const prevInput = { ...prev.inputs[input] };
      prevInput.value = event.target.value;
      prevInput.touched = true;
      prevInput.isValid = checkInputValidation(prevInput.value, prevInput.rules, prevInput, state);
      let formValid = true;
      Object.keys(state).map(item => {
        if (item !== input) {
          formValid = state[item].isValid && formValid;
        } else formValid = prevInput.isValid && formValid;
      });

      return {
        ...prev,
        inputs: {
          ...prev.inputs,
          [input]: prevInput,
        },
        formValid,
      };
    }, index);
  }
}

export function inputBlur(event: ChangeEvent<any>, input: string, state: any, callback: any, validCallback: any) {
  callback((prev: any) => {
    const prevInput = { ...prev[input] };
    prevInput.isValid = checkInputValidation(prevInput.value, prevInput.validation, prevInput, state);
    let formValid = true;
    Object.keys(state).map(item => {
      formValid = state[item].isValid && formValid;
    });
    return {
      ...prev,
      [input]: prevInput,
    };
  });

  validCallback(() => {
    let formValid = true;
    Object.keys(state).map(item => {
      formValid = state[item].isValid && formValid;
    });
    return formValid;
  });
}

export function checkInputValidation(value: any, rules: any, input: any, inputState: any) {
  let isValid = true;
  if (rules.minLength) {
    const thisValid = value.trim().length >= Number(rules.minLength.value) || value.trim() === '';
    isValid = thisValid && isValid;
    if (!thisValid) {
      input.currentErrTxt = rules.minLength.errorText;
    }
  }
  if (rules.maxLength) {
    const thisValid = value.trim().length <= Number(rules.maxLength.value);
    isValid = thisValid && isValid;
    if (!thisValid) {
      input.currentErrTxt = rules.maxLength.errorText;
    }
  }
  if (rules.regexp) {
    if (value.trim().length > 0) {
      const exp = rules.regexp.value;
      if (!Array.isArray(exp)) {
        const reg = new RegExp(exp);
        const thisValid = reg.test(value.trim());
        isValid = thisValid && isValid;
        if (!thisValid) {
          input.currentErrTxt = rules.regexp.errorText;
        }
      } else {
        exp.forEach((item: any) => {
          const reg = new RegExp(item.exp);
          const thisValid = reg.test(value.trim());
          isValid = thisValid && isValid;
          if (!thisValid) {
            input.currentErrTxt = item.errorText;
          }
        });

      }
    }
  }
  if (rules.isEqualToPass) {
    isValid = value === inputState.password.value && isValid;
    if (!isValid) {
      input.currentErrTxt = rules.isEqualToPass.errorText;
    }
  }
  if (rules.required) {
    let thisValid;
    if (input.type === 'multi-select') {
      thisValid = !!value.length;
    } else thisValid = value.trim() !== '';
    isValid = thisValid && isValid;
    if (!thisValid) {
      input.currentErrTxt = rules.required.errorText;
    }
  }

  return isValid;
}

export const checkClaims = (userClaims: any[] = [], claim: string = '') => {
  return userClaims?.includes(claim);
};

export const renderDateFormat = (date: any, inputFormat: boolean = false) => {
  const dateFormat = new Date(date);
  let dayFormat: any = '';
  let mothFormat: any = '';
  let yearFormat: any = '';
  if (dateFormat.getMonth() >= 9) {
    mothFormat = dateFormat.getMonth() + 1;
  } else {
    mothFormat = '0' + (dateFormat.getMonth() + 1);
  }
  if (dateFormat.getDate() >= 10) {
    dayFormat = dateFormat.getDate();
  } else dayFormat = '0' + dateFormat.getDate();
  yearFormat = dateFormat.getFullYear();

  return inputFormat ? yearFormat + '-' + mothFormat + '-' + dayFormat : dayFormat + '.' + mothFormat + '.' + yearFormat;
};

export const extractTime = (date: any) => {
  let hours: any = '';
  let minutes: any = '';

  const dateFormat = new Date(date);
  if (dateFormat.getHours() <= 9) {
    hours = `0${dateFormat.getHours()}`;
  } else {
    hours = dateFormat.getHours();
  }

  if (dateFormat.getMinutes() <= 9) {
    minutes = `0${dateFormat.getMinutes()}`;
  } else {
    minutes = dateFormat.getMinutes();
  }
  return `${hours}:${minutes}`;
};


export const touchInputs = (keys: string | string[], callback: SetStateAction<any>) => {
  callback((prev: any) => {
    if (Array.isArray(prev)){
      const newState = prev.map((state: any)=>{
        const inputs = { ...state.inputs };
        if (Array.isArray(keys)) {
          keys.forEach(key => {
            inputs[key].touched = true;
          });
        } else inputs[keys].touched = true;
        return {
          ...state,
          inputs,
        };
      })
      return newState;
    }
    else{
      const inputs = { ...prev.inputs };
      if (Array.isArray(keys)) {
        keys.forEach(key => {
          inputs[key].touched = true;
        });
      } else inputs[keys].touched = true;
      return {
        ...prev,
        inputs,
      };
    }
    
  });
};

export const rearrangeElemInArray = (arr: any[], from: number, to: number) => {
  arr?.splice(to, 0, arr.splice(from, 1)[0]);
};

export const checkIfObject = (data: any) => {
  return typeof data === 'object' &&
    !Array.isArray(data) && data !== null;
};

export const isFile = (data: any) => {
  return !!(data.path && data.name && data.size && data.type);
};

export const toFormData = (data: any, noIndex?: boolean) => {
  const formData = new FormData();
  for (const key in data) {
    if (Array.isArray(data[key])) {
      data[key].forEach((item: any, index: number) => {
        if (checkIfObject(item) && !isFile(item)) {
          for (const partObjKey in item) {
            if (noIndex) {
              formData.append(key + `[${index}]`, item[partObjKey]);
            } else {
              formData.append(key + `[${index}].${partObjKey}`, item[partObjKey]);
            }
          }
        } else {
          if (isFile(item)) {
            formData.append(key, item);
          } else {
            formData.append(key + `[${index}]`, item);
          }
        }

      });
    } else formData.append(key, data[key]);
  }
  return formData;
};

export const toFormDataObj = (data: any, noIndex?: boolean) => {
  const obj: any = {};
  for (const key in data) {
    if (Array.isArray(data[key])) {
      data[key].forEach((item: any, index: number) => {
        if (checkIfObject(item) && !isFile(item)) {
          for (const partObjKey in item) {
            if (noIndex) {
              obj[key + `[${index}]`] = item[partObjKey];
            } else {
              obj[key + `[${index}].${partObjKey}`] = item[partObjKey];
            }
          }
        } else {
          if (isFile(item)) {
            obj[key] = item;
          } else {
            obj[key + `[${index}]`] = item;
          }
        }

      });
    } else obj[key] = data[key];
  }
  return obj;
};
export const objectToFormData = function(obj: any, form?: FormData, namespace?: string, noIndex?: boolean) {

  const fd = form || new FormData();
  let formKey: any;

  for(const property in obj) {
    if(obj.hasOwnProperty(property)) {

      if(namespace) {
        if (!isNaN(+property)) {
          formKey = namespace + '[' + property + ']';
        }
        else formKey = namespace + '.' + property;
      } else {
        formKey = property;
      }
      if(typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
        objectToFormData(obj[property], fd, formKey, noIndex);
      }
      else if (Array.isArray(obj[property])) {
        obj[property].forEach((item: any, index: number) => {
          if (checkIfObject(item) && !isFile(item)) {
            for (const partObjKey in item) {
              if (noIndex) {
                fd.append(formKey + `[${index}]`, item[partObjKey]);
              } else {
                fd.append(formKey + `[${index}].${partObjKey}`, item[partObjKey]);
              }
            }
          } else {
            if (isFile(item)) {
              fd.append(formKey, item);
            } else {
              fd.append(formKey + `[${index}]`, item);
            }
          }

        });
      }
      else {
        fd.append(formKey, obj[property]);
      }

    }
  }

  return fd;

};
export const calcEndDate = (data: any) => {
  if (data) {
    const date1: any = new Date();
    const date2: any = new Date(data);
    const diffTime = date2 - date1;
    if (diffTime <= 0) return 0;
    else {
      const days = Math.floor(diffTime / (24 * 60 * 60 * 1000));
      const daysms = diffTime % (24 * 60 * 60 * 1000);
      const hours = Math.floor(daysms / (60 * 60 * 1000));
      const hoursms = diffTime % (60 * 60 * 1000);
      const minutes = Math.floor(hoursms / (60 * 1000));
      const minutesms = diffTime % (60 * 1000);
      const sec = Math.floor(minutesms / 1000);
      return {
        day: days,
        hour: hours,
        minute: minutes,
      };
    }
  }
  return 0;

};
