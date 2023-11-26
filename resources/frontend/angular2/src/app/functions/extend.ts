// import { ThrowStmt } from "@angular/compiler";
import { clone } from "./clone";

/**
 * Recursively extend an object by one or more other objects
 */
export function extend<T>(source:T, ...args:T[]):T
{
    for(let arg of args)
    {
        source = doExtend(source, arg);
    }

    return source;
}

/**
 *
 * @param source Extend but only where the source value is empty
 * @param args
 * @returns
 */
export function extend_if_null<T>(source:T, ...args:T[]):T
{
    for(let arg of args)
    {
        source = doExtend(source, arg, true);
    }

    return source;
}

function doExtend<T>(s:T, t:T, is_null:boolean =  false):T
{
    let source : any = s || {};
    let target : any = t || {};

    if(typeof target != "object")
        return source;

    for(let key in target)
    {
        // If both source and target are objects - continue extending recursively
        if(source[key] && typeof source[key] == "object" && typeof target[key] == "object")
        {
            source[key] = doExtend(source[key], target[key], is_null);
        }
        // Otherwise clone value only if the source is null or the is_null requirement is false
        else if(!is_null || source[key] == null)
        {
            source[key] = clone(target[key]);
        }
    }

    return source;
}
