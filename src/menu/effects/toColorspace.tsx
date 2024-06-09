import { Collapsable, EnumParam, SectionProps } from "..";

export function ToColorspace({ open, applied, appendParam, removeParam, setApplied, setOpen }: SectionProps) {
    return <Collapsable
        section="ToColorspace"
        open={open.toColorspace}
        setOpen={(val) => setOpen({ ...open, toColorspace: val })}
    >
        <EnumParam
            name="toColorspace"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, toColorspace: true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    toColorspace: false,
                });
            }}
            mayApply
            required
            applied={applied.toColorspace}
            options={[
                "multiband",
                "b-w",
                "histogram",
                "xyz",
                "lab",
                "cmyk",
                "labq",
                "rgb",
                "cmc",
                "lch",
                "labs",
                "srgb",
                "yxy",
                "fourier",
                "rgb16",
                "grey16",
                "matrix",
                "scrgb",
                "hsv",
            ]}
        />
    </Collapsable>
}