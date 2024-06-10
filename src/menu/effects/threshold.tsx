import { BooleanParam, Collapsable, NumericParam, SectionProps } from "..";

export function Threshold({ open, applied, appendParam, removeParam, setApplied, setOpen, values }: SectionProps) {
    return <Collapsable
        section="Threshold"
        open={open.threshold}
        setOpen={(val) => setOpen({ ...open, threshold: val })}
    >
        <NumericParam
            name="threshold"
            current={values.threshold}
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, threshold: true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    threshold: false,
                });
            }}
            mayApply
            required
            applied={applied.threshold}
        />
        <BooleanParam
            name="threshold.grayscale"
            current={values["threshold.grayscale"]}
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, "threshold.grayscale": true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    "threshold.grayscale": false,
                });
            }}
            mayApply={applied.threshold}
            applied={applied["threshold.grayscale"]}
        />
    </Collapsable>

}