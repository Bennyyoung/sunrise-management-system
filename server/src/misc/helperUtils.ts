import { NoInfer } from './types/helperTypes';
import _ from 'lodash';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export const helperUtils = {
  uuid: {
    getUniqueId() {
      return uuidv4();
    },
  },

  enumContains(enumObject: any, val: any) {
    for (const valId in enumObject) {
      if (val === enumObject[valId]) {
        return true;
      }
    }

    return false;
  },

  createLookup<T, V extends string | number>(
    arr: T[],
    predicate: (val: T) => V,
  ) {
    const lookup: { [key in V]: T } = {} as any;
    arr.forEach((val) => {
      lookup[predicate(val)] = val;
    });

    return lookup;
  },

  createSet<T>(arr: T[]) {
    const set = new Set<T>();
    arr.forEach((val) => {
      set.add(val);
    });
    return set;
  },

  assignObjectSafely<
    T extends O = never,
    O extends Record<string, unknown> = never,
  >(target: NoInfer<T>, obj: NoInfer<O>, allowedFields: (keyof T)[]) {
    const allowedFieldSet = new Set(allowedFields);

    const clonedObj = _.clone(obj);
    for (const key in clonedObj) {
      if (!allowedFieldSet.has(key)) {
        delete clonedObj[key];
      }
    }

    const res = Object.assign(target, clonedObj);
    return res;
  },

  checkUndefined(obj: { [key: string]: any }): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
        return false;
      }
    }
    return true;
  },

  createPatientAge(age: Date | undefined): string {
    // Calculate Patient Age
    const years = moment().diff(moment(age), 'years');
    const months = moment().diff(moment(age), 'months') % 12;
    const weeks = moment().diff(moment(age), 'weeks') % 52;

    if (years < 1) {
      return months > 1 ? `${months} months` : `${weeks} weeks`;
    } else {
      return years > 1 ? `${years} years` : `${years} year`;
    }
  },
};
