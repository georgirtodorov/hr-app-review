/**
 * Clones object
 * @param v
 * @returns
 */
export function clone<T>(v:T):T
{
    if(v == null)
        return null;

    if(v instanceof Array)
    {
        // Clone array
        return v.slice().map(v => clone(v)) as any;
    }

    if(typeof v == "object")
    {
        // Clone object
        const out : any = {};

        for(const key in v)
        {
            out[key] = clone(v[key]);
        }

        return out;
    }

    // Leave everything else as is
    return v;
}
