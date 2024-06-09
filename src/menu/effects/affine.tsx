import { ArrayParam, Collapsable, ColorParam, EnumParam, NumericParam, SectionProps } from "..";

export function Affine({ open, applied, appendParam, removeParam, setApplied, setOpen }: SectionProps) {
    return <Collapsable
        section="Affine"
        open={open.affine}
        setOpen={(val) => setOpen({ ...open, affine: val })}
    >
        <ArrayParam
            name="affine"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, affine: true });
            }}
            removeParam={(param) => {
                removeParam([
                    ...param,
                    "affine.background",
                    "affine.idx",
                    "affine.idy",
                    "affine.odx",
                    "affine.ody",
                    "affine.interpolator",
                ]);
                setApplied({
                    ...applied,
                    affine: false,
                    "affine.background": false,
                    "affine.idx": false,
                    "affine.idy": false,
                    "affine.odx": false,
                    "affine.ody": false,
                    "affine.interpolator": false,
                });
            }}
            mayApply
            required
            applied={applied.affine}
        />
        <ColorParam
            name="affine.background"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, "affine.background": true });
            }}
            removeParam={(param) => {
                removeParam(param);
                setApplied({ ...applied, "affine.background": false });
            }}
            mayApply={applied.affine}
            applied={applied["affine.background"]}
        />
        {["affine.idx", "affine.idy", "affine.odx", "affine.ody"].map(key =>
            <NumericParam
                name={key}
                appendParam={(param, value) => {
                    appendParam(param, value);
                    setApplied({ ...applied, [key]: true });
                }}
                removeParam={(param) => {
                    removeParam([...param]);
                    setApplied({
                        ...applied,
                        [key]: false,
                    });
                }}
                mayApply={applied.affine}
                applied={applied[key]}
            />
        )}
        <EnumParam
            name="affine.interpolator"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, "affine.interpolator": true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    "affine.interpolator": false,
                });
            }}
            mayApply={applied.affine}
            applied={applied["affine.interpolator"]}
            options={["nearest", "bilinear", "bicubic", "lbb", "nohalo", "vsqbs"]}
        />
    </Collapsable>
}