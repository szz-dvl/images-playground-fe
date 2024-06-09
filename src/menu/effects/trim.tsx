import { BooleanParam, Collapsable, ColorParam, EnumParam, NumericParam, SectionProps } from "..";

export function Trim({ open, applied, appendParam, removeParam, setApplied, setOpen }: SectionProps) {
    return <Collapsable
        section="Trim"
        open={open.trim}
        setOpen={(val) => setOpen({ ...open, trim: val })}
    >
        <ColorParam
            name="trim.background"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, "trim.background": true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    "trim.background": false,
                });
            }}
            mayApply
            applied={applied["trim.background"]}
        />
        <NumericParam
            name="trim.threshold"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, "trim.threshold": true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    "trim.threshold": false,
                });
            }}
            mayApply
            applied={applied["trim.threshold"]}
        />
        <BooleanParam
            name="trim.lineArt"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, "trim.lineArt": true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    "trim.lineArt": false,
                });
            }}
            mayApply
            applied={applied["trim.lineArt"]}
        />
    </Collapsable>
}