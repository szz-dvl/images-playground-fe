import { ArrayParam, Collapsable, SectionProps } from "..";

export function Recomb({ open, applied, appendParam, removeParam, setApplied, setOpen }: SectionProps) {
    return <Collapsable
        section="Recomb"
        open={open.recomb}
        setOpen={(val) => setOpen({ ...open, recomb: val })}
    >
        {["recomb.0", "recomb.1", "recomb.2"].map((key) => (
            <ArrayParam
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
                mayApply
                required
                applied={applied[key]}
            />
        ))}
    </Collapsable>
}