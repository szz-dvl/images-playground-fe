import { BooleanParam, Collapsable, NumericParam, SectionProps } from "..";

export function Sharpen({ open, applied, appendParam, removeParam, setApplied, setOpen }: SectionProps) {
    return <Collapsable
        section="Sharpen"
        open={open.sharpen}
        setOpen={(val) => setOpen({ ...open, sharpen: val })}
    >
        <BooleanParam
            name="sharpen"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, sharpen: true });
            }}
            removeParam={(param) => {
                removeParam([
                    ...param,
                    "sharpen.sigma",
                    "sharpen.m1",
                    "sharpen.m2",
                    "sharpen.x1",
                    "sharpen.y2",
                    "sharpen.y3",
                ]);
                setApplied({
                    ...applied,
                    sharpen: false,
                    "sharpen.sigma": false,
                    "sharpen.m1": false,
                    "sharpen.m2": false,
                    "sharpen.x1": false,
                    "sharpen.y2": false,
                    "sharpen.y3": false,
                });
            }}
            mayApply
            required
            applied={applied.sharpen}
        />
        <NumericParam
            name="sharpen.sigma"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, "sharpen.sigma": true });
            }}
            removeParam={(param) => {
                removeParam([
                    ...param,
                    "sharpen.m1",
                    "sharpen.m2",
                    "sharpen.x1",
                    "sharpen.y2",
                    "sharpen.y3",
                ]);
                setApplied({
                    ...applied,
                    "sharpen.sigma": false,
                    "sharpen.m1": false,
                    "sharpen.m2": false,
                    "sharpen.x1": false,
                    "sharpen.y2": false,
                    "sharpen.y3": false,
                });
            }}
            mayApply={applied.sharpen}
            required
            applied={applied["sharpen.sigma"]}
        />
        {[
            "sharpen.m1",
            "sharpen.m2",
            "sharpen.x1",
            "sharpen.y2",
            "sharpen.y3",
        ].map((key) => (
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
                mayApply={applied.sharpen}
                applied={applied[key]}
            />
        ))}
    </Collapsable>
}