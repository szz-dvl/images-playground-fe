import { ArrayParam, Collapsable, NumericParam, SectionProps } from "..";

export function Convolve({ open, applied, appendParam, removeParam, setApplied, setOpen }: SectionProps) {
    return <Collapsable
        section="Convolve"
        open={open.convolve}
        setOpen={(val) => setOpen({ ...open, convolve: val })}
    >
        <ArrayParam
            name="convolve.kernel"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, "convolve.kernel": true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    "convolve.kernel": false,
                });
            }}
            mayApply
            required
            applied={applied["convolve.kernel"]}
        />
        {[
            "convolve.width",
            "convolve.height",
            "convolve.scale",
            "convolve.offset",
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
                mayApply
                required={["convolve.height", "convolve.width"].includes(key)}
                applied={applied[key]}
            />
        ))}
    </Collapsable>

}