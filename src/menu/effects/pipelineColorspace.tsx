import { Collapsable, EnumParam, SectionProps } from "..";

export function PipelineColorspace({ open, applied, appendParam, removeParam, setApplied, setOpen, values }: SectionProps) {
    return <Collapsable
        section="PipelineColorspace"
        open={open.pipelineColorspace}
        setOpen={(val) => setOpen({ ...open, pipelineColorspace: val })}
    >
        <EnumParam
            name="pipelineColorspace"
            current={values.pipelineColorspace}
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, pipelineColorspace: true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    pipelineColorspace: false,
                });
            }}
            mayApply
            required
            applied={applied.pipelineColorspace}
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