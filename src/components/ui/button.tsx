import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                default:
                    'cursor-pointer bg-[#111111] text-white hover:scale-[1.02] hover:opacity-90',
                destructive:
                    'cursor-pointer bg-[#111111] text-white hover:scale-[1.02] hover:opacity-90',
                outline:
                    'cursor-pointer border border-black/10 bg-white text-[#111111] hover:scale-[1.02] hover:bg-[#f5f5f7]',
                secondary:
                    'cursor-pointer bg-[#f5f5f7] text-[#111111] hover:scale-[1.02] hover:bg-[#ededf0]',
                ghost: 'cursor-pointer text-[#111111] hover:bg-[#f5f5f7]',
                link: 'cursor-pointer text-[#111111] underline-offset-4 hover:underline',
            },
            size: {
                default: 'min-h-11 px-5 py-3',
                sm: 'min-h-10 px-4 py-2 text-sm',
                lg: 'min-h-12 px-8 py-3.5 text-base',
                icon: 'h-11 w-11',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
