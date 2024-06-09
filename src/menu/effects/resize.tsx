import { BooleanParam, Collapsable, ColorParam, EnumParam, NumericParam, SectionProps } from "..";

export function Resize({ open, applied, appendParam, removeParam, setApplied, setOpen }: SectionProps) {
    return <Collapsable
        section="Resize"
        open={open.resize}
        setOpen={(val) => setOpen({ ...open, resize: val })}
    >
        {["resize.width", "resize.height"].map((key) => (
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
                applied={applied[key]}
            />
        ))}
        <EnumParam
            name="resize.fit"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, "resize.fit": true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    "resize.fit": false,
                });
            }}
            mayApply
            applied={applied["resize.fit"]}
            options={["cover", "contain", "fill", "inside", "outside"]}
        />
        <EnumParam
            name="resize.position"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, "resize.position": true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    "resize.position": false,
                });
            }}
            mayApply
            applied={applied["resize.position"]}
            options={[
                "center",
                "top",
                "right top",
                "right",
                "right bottom",
                "bottom",
                "left",
                "left bottom",
                "left top",
            ]}
        />
        <ColorParam
            name="resize.background"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, "resize.background": true });
            }}
            removeParam={(param) => {
                removeParam(param);
                setApplied({ ...applied, "resize.background": false });
            }}
            mayApply
            applied={applied["resize.background"]}
        />
        <EnumParam
            name="resize.kernel"
            appendParam={(param, value) => {
                appendParam(param, value);
                setApplied({ ...applied, "resize.kernel": true });
            }}
            removeParam={(param) => {
                removeParam([...param]);
                setApplied({
                    ...applied,
                    "resize.kernel": false,
                });
            }}
            mayApply
            applied={applied["resize.kernel"]}
            options={[
                "nearest",
                "linear",
                "cubic",
                "mitchell",
                "lanczos2",
                "lanczos3",
            ]}
        />
        {[
            "resize.withoutEnlargement",
            "resize.withoutReduction",
            "resize.fastShrinkOnLoad",
        ].map((key) => (
            <BooleanParam
                name={key}
                appendParam={(param, value) => {
                    appendParam(param, value);
                    setApplied({ ...applied, [key]: true });
                }}
                removeParam={(param) => {
                    removeParam(param);
                    setApplied({ ...applied, [key]: false });
                }}
                mayApply
                applied={applied[key]}
            />
        ))}
    </Collapsable>
}