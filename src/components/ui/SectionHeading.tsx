interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: 'left' | 'center';
}

const SectionHeading = ({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) => {
    const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';

    return (
        <div className={`flex flex-col gap-3 ${alignment}`}>
            {eyebrow ? (
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#86868b] sm:text-xs">
                    {eyebrow}
                </span>
            ) : null}
            <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight text-[#111111] sm:text-4xl lg:text-5xl">
                    {title}
                </h2>
                {description ? (
                    <p className="max-w-2xl text-sm leading-6 text-[#86868b] sm:text-base">
                        {description}
                    </p>
                ) : null}
            </div>
        </div>
    );
};

export default SectionHeading;
