import { useState } from "react";
import { ArrowRight } from "lucide-react";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "",
    message: "",
  });

  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="text-5xl font-bold mb-1 text-foreground">
          Let's start planning
        </h1>
        <p
          className="text-5xl italic text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          your next journey
        </p>
      </div>

      <form onSubmit={() => {}} className="space-y-7">
        <div className="space-y-1">
          <label
            htmlFor="name"
            className="text-sm text-muted-foreground font-normal"
          >
            Name
          </label>
          <input
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="border-0 border-b border-muted-foreground/30 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-primary bg-transparent"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="email"
            className="text-sm text-muted-foreground font-normal"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="john@gmail.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="border-0 border-b border-muted-foreground/30 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-primary bg-transparent"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="phone"
            className="text-sm text-muted-foreground font-normal"
          >
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="0123456789"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
            className="border-0 border-b border-muted-foreground/30 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-primary bg-transparent"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="inquiry"
            className="text-sm text-muted-foreground font-normal"
          >
            Inquiry for
          </label>
          <select
            value={formData.inquiry}
            onChange={(e) =>
              setFormData({ ...formData, inquiry: e.target.value })
            }
          >
            <option value="" disabled>
              Destination/City
            </option>
            <option value="europe">European Adventures</option>
            <option value="asia">Asian Escapes</option>
            <option value="americas">Americas Exploration</option>
            <option value="africa">African Safari</option>
            <option value="oceania">Pacific Paradise</option>
            <option value="custom">Custom Journey</option>
          </select>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="message"
            className="text-sm text-muted-foreground font-normal"
          >
            Message
          </label>
          <textarea
            id="message"
            placeholder="Type your requirements or extra details"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
            className="border-0 border-b border-muted-foreground/30 rounded-none px-0 py-2 min-h-[60px] resize-none focus-visible:ring-0 focus-visible:border-primary bg-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-7 text-base font-medium group mt-8"
        >
          Send message
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
};
