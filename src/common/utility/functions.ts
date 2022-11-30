import { ParamResultEnum } from "../enums/param.result.enum";

export function IsEntity(param) {
    return ParamResultEnum.Entity == param
}
export function getLogLevelByStatus(status: number) {
    return status >= 500? "error" : status>=400? "warm" : "log"
}