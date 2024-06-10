import { BooleanParam, Collapsable, NumericParam, SectionProps } from "..";

export function Clahe({ open, applied, appendParam, removeParam, setApplied, setOpen, values }: SectionProps) {
    return <Collapsable
        section="CLAHE"
        open={open.clahe}
        setOpen={(val) => setOpen({ ...open, clahe: val })}
    >
        {["clahe.width", "clahe.height", "clahe.maxSlope"].map((key) => (
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
                mayApply
                required={key !== "clahe.maxSlope"}
                applied={applied[key]}
            />
        ))}
    </Collapsable>

}