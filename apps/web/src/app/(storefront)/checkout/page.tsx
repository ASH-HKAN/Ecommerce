"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Edit3, ArrowLeft, ArrowRight, CreditCard } from "lucide-react";
import { toast } from "sonner";
import {
  CheckoutStepper,
  type Step,
} from "@/components/checkout/checkout-stepper";
import {
  CheckoutSummary,
  SHIPPING_OPTIONS,
  shippingLabel,
  shippingPrice,
  totalForCheckout,
  type ShippingId,
} from "@/components/checkout/checkout-summary";
import { useCartStore, selectCartSubtotal } from "@/features/cart/use-cart-store";
import { formatPrice } from "@/lib/fmt";
import { cn } from "@/lib/utils";

const AddressSchema = z.object({
  firstName: z.string().min(1, "Enter your first name."),
  lastName:  z.string().min(1, "Enter your last name."),
  email:     z.email("Enter a valid email address."),
  phone:     z.string().min(6, "Enter your phone number."),
  line1:     z.string().min(3, "Enter your street address."),
  line2:     z.string().optional(),
  city:      z.string().min(1, "Enter your city."),
  region:    z.string().min(1, "Enter your state or region."),
  postal:    z.string().min(3, "Enter your postal code."),
  country:   z.string().min(2, "Choose a country."),
});
type AddressValues = z.infer<typeof AddressSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const subtotal = useCartStore(selectCartSubtotal);
  const [step, setStep] = React.useState<Step>("address");
  const [hydrated, setHydrated] = React.useState(false);
  const [shipping, setShipping] = React.useState<ShippingId>("standard");
  const [paymentMethod, setPaymentMethod] = React.useState<"card" | "applepay" | "googlepay">("card");
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => setHydrated(true), []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<AddressValues>({
    resolver: zodResolver(AddressSchema),
    mode: "onBlur",
    defaultValues: {
      country: "US",
    },
  });

  // Empty basket — block early
  if (hydrated && lines.length === 0) {
    return (
      <section className="container py-20 text-center">
        <h1 className="font-display text-display-sm">
          Nothing to check out yet.
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Add a few tools to your basket and we'll bring you back here.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Browse tools
        </Link>
      </section>
    );
  }

  function next() {
    if (step === "address") setStep("delivery");
    else if (step === "delivery") setStep("payment");
    else if (step === "payment") setStep("review");
  }
  function back() {
    if (step === "review") setStep("payment");
    else if (step === "payment") setStep("delivery");
    else if (step === "delivery") setStep("address");
  }

  function onAddressSubmit(_values: AddressValues) {
    next();
  }

  async function onPlaceOrder() {
    if (!acceptedTerms) {
      toast.error("Please confirm the terms to continue.");
      return;
    }
    setSubmitting(true);
    // Simulate Stripe redirect — in real life we'd call /api/checkout
    await new Promise((r) => setTimeout(r, 900));

    // 80% success path for the prototype; wire to ?demo=fail to force failure.
    const url = new URL(window.location.href);
    const forceFail = url.searchParams.get("demo") === "fail";
    if (forceFail || Math.random() < 0.15) {
      router.push("/checkout/failure");
    } else {
      router.push("/checkout/success");
    }
  }

  const total = totalForCheckout(subtotal, shipping);

  return (
    <section className="py-10 lg:py-14">
      <div className="container">
        <h1 className="mb-6 font-display text-display-sm md:text-display-md">
          Checkout
        </h1>

        <CheckoutStepper current={step} onJump={(s) => setStep(s)} />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,360px]">
          <div className="space-y-6">
            {step === "address" && (
              <form
                noValidate
                onSubmit={handleSubmit(onAddressSubmit)}
                className="rounded-xl border bg-card p-6"
              >
                <h2 className="font-display text-lg font-semibold">
                  Shipping address
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  We'll only use this to deliver your order.
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <Field
                    label="First name"
                    {...register("firstName")}
                    error={errors.firstName?.message}
                  />
                  <Field
                    label="Last name"
                    {...register("lastName")}
                    error={errors.lastName?.message}
                  />
                  <Field
                    label="Email"
                    type="email"
                    {...register("email")}
                    error={errors.email?.message}
                  />
                  <Field
                    label="Phone"
                    type="tel"
                    {...register("phone")}
                    error={errors.phone?.message}
                  />
                  <Field
                    label="Address line 1"
                    className="md:col-span-2"
                    {...register("line1")}
                    error={errors.line1?.message}
                  />
                  <Field
                    label="Address line 2 (optional)"
                    className="md:col-span-2"
                    {...register("line2")}
                  />
                  <Field
                    label="City"
                    {...register("city")}
                    error={errors.city?.message}
                  />
                  <Field
                    label="State / region"
                    {...register("region")}
                    error={errors.region?.message}
                  />
                  <Field
                    label="Postal code"
                    {...register("postal")}
                    error={errors.postal?.message}
                  />
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium" htmlFor="country">
                      Country
                    </label>
                    <select
                      id="country"
                      {...register("country")}
                      className="h-11 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="DE">Germany</option>
                      <option value="AE">United Arab Emirates</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={!isValid && Object.keys(errors).length > 0}
                    className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    Continue to delivery
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </form>
            )}

            {step === "delivery" && (
              <div className="rounded-xl border bg-card p-6">
                <h2 className="font-display text-lg font-semibold">
                  Delivery method
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Choose how fast you need it.
                </p>
                <ul className="mt-5 space-y-3">
                  {SHIPPING_OPTIONS.map((o) => (
                    <li key={o.id}>
                      <button
                        type="button"
                        onClick={() => setShipping(o.id as ShippingId)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md border bg-background p-4 text-left transition-colors hover:bg-muted/60",
                          shipping === o.id && "border-primary ring-1 ring-primary/40"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={cn(
                              "mt-0.5 grid size-5 place-items-center rounded-full border",
                              shipping === o.id ? "border-primary" : "border-border"
                            )}
                          >
                            {shipping === o.id && (
                              <span className="size-2.5 rounded-full bg-primary" />
                            )}
                          </span>
                          <div>
                            <p className="font-medium">{o.label}</p>
                            <p className="text-xs text-muted-foreground">
                              {o.eta}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-medium tabular-nums">
                          {o.price === 0 ? "Free" : formatPrice(o.price)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex h-11 items-center gap-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="size-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Continue to payment
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            )}

            {step === "payment" && (
              <div className="rounded-xl border bg-card p-6">
                <h2 className="font-display text-lg font-semibold">Payment</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Payments are processed by Stripe. We never see your card.
                </p>
                <ul className="mt-5 space-y-3">
                  {[
                    { id: "card",      label: "Card", hint: "Visa, MC, Amex" },
                    { id: "applepay",  label: "Apple Pay" },
                    { id: "googlepay", label: "Google Pay" },
                  ].map((m) => (
                    <li key={m.id}>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod(m.id as typeof paymentMethod)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md border bg-background p-4 text-left transition-colors hover:bg-muted/60",
                          paymentMethod === m.id && "border-primary ring-1 ring-primary/40"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "grid size-5 place-items-center rounded-full border",
                              paymentMethod === m.id ? "border-primary" : "border-border"
                            )}
                          >
                            {paymentMethod === m.id && (
                              <span className="size-2.5 rounded-full bg-primary" />
                            )}
                          </span>
                          <CreditCard className="size-4 text-muted-foreground" />
                          <span className="font-medium">{m.label}</span>
                          {m.hint && (
                            <span className="text-xs text-muted-foreground">
                              {m.hint}
                            </span>
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>

                {paymentMethod === "card" && (
                  <div className="mt-5 rounded-lg border bg-background p-4">
                    <p className="text-eyebrow uppercase text-muted-foreground">
                      Stripe Elements
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      In production, the card form lives inside an iframe served by
                      Stripe. For the prototype, this is a placeholder.
                    </p>
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex h-11 items-center gap-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="size-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Review order
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            )}

            {step === "review" && (
              <div className="space-y-4">
                <ReviewBlock
                  title="Shipping address"
                  onEdit={() => setStep("address")}
                >
                  {(() => {
                    const v = getValues();
                    return (
                      <>
                        <p>{v.firstName} {v.lastName}</p>
                        <p>{v.line1}{v.line2 ? `, ${v.line2}` : ""}</p>
                        <p>{v.city}, {v.region} {v.postal}</p>
                        <p>{v.country}</p>
                        <p className="text-xs text-muted-foreground">
                          {v.email} · {v.phone}
                        </p>
                      </>
                    );
                  })()}
                </ReviewBlock>

                <ReviewBlock
                  title="Delivery method"
                  onEdit={() => setStep("delivery")}
                >
                  <p>{shippingLabel(shipping)}</p>
                  <p className="text-xs text-muted-foreground">
                    {shippingPrice(shipping) === 0
                      ? "Free"
                      : formatPrice(shippingPrice(shipping))}
                  </p>
                </ReviewBlock>

                <ReviewBlock
                  title="Payment"
                  onEdit={() => setStep("payment")}
                >
                  <p className="capitalize">{paymentMethod}</p>
                </ReviewBlock>

                <div className="rounded-xl border bg-card p-6">
                  <label className="flex items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 size-4"
                    />
                    <span>
                      I agree to the{" "}
                      <Link href="/legal/terms" className="text-primary hover:underline">
                        terms
                      </Link>{" "}
                      and the{" "}
                      <Link href="/returns" className="text-primary hover:underline">
                        returns policy
                      </Link>
                      .
                    </span>
                  </label>

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={back}
                      className="inline-flex h-11 items-center gap-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="size-4" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={onPlaceOrder}
                      disabled={submitting}
                      className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                    >
                      {submitting ? "Processing…" : `Pay ${formatPrice(total)}`}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <CheckoutSummary shipping={shipping} />
        </div>
      </div>
    </section>
  );
}

const Field = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    className?: string;
  }
>(function Field({ label, error, className, ...props }, ref) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="text-xs font-medium" htmlFor={props.name}>
        {label}
      </label>
      <input
        id={props.name}
        ref={ref}
        {...props}
        aria-invalid={!!error}
        className={cn(
          "h-11 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30",
          error && "border-destructive"
        )}
      />
      {error && (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

function ReviewBlock({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
        >
          <Edit3 className="size-3.5" />
          Edit
        </button>
      </div>
      <div className="mt-3 space-y-1 text-sm">{children}</div>
    </div>
  );
}
