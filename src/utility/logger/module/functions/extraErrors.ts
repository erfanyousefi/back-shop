import { ValidationError } from "@nestjs/common";
const {values} = Object;
export const extractAllErrors = (e: ValidationError): string[] => {
    if (!!e.children && e.children.length) {
      const errors: string[] = [];
      e.children.forEach((child) => {
        errors.push(
          ...extractAllErrors(child).map(
            (childErr) => `${e.property} => ${childErr}`,
          ),
        );
      });
      return errors;
    } else {
      return values(e.constraints);
    }
  };