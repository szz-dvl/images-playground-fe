import { Collapsable, NumericParam, SectionProps } from "..";

export function Modulate({ open, applied, appendParam, removeParam, setApplied, setOpen, values }: SectionProps) {
    return <Collapsable
        section="Modulate"
        open={open.modulate}
        setOpen={(val) => setOpen({ ...open, modulate: val })}
    >
        {[
            "modulate.saturation",
            "modulate.brightness",
            "modulate.hue",
            "modulate.lightness",
        ].map((key) => (
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
                applied={applied[key]}
            />
        ))}
    </Collapsable>
}