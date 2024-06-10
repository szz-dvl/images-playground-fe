import { BooleanParam, Collapsable, NumericParam, SectionProps } from "..";

export function Normalise({ open, applied, appendParam, removeParam, setApplied, setOpen, values }: SectionProps) {
    return <Collapsable
        section="Normalise"
        open={open.normalise}
        setOpen={(val) => setOpen({ ...open, normalise: val })}
    >
        <BooleanParam
            name="normalise"
            current={values.normalise}
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, normalise: true });
            }}
            removeParam={(param) => {
                removeParam([...param, "normalise.upper", "normalise.lower"]);
                setApplied({
                    ...applied,
                    normalise: false,
                    "normalise.lower": false,
                    "normalise.upper": false,
                });
            }}
            mayApply
            required
            applied={applied.normalise}
        />
        {["normalise.lower", "normalise.upper"].map((key) => (
            <NumericParam
                name={key}
                current={values[key]}
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
                mayApply={applied.normalise}
                applied={applied[key]}
            />
        ))}
    </Collapsable>

}