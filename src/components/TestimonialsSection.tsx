import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Er hat unseren Späti-Lieferservice von 0 auf 100 gebracht – heute liefern wir jede Nacht an Fabriken und Haushalte.",
    author: "Gründer, Spätimobil",
    accent: "border-accent-commercial",
  },
  {
    quote: "Die Plattform für pflegende Angehörige ist nicht nur technisch brilliant, sie hilft wirklich Menschen. In Rekordzeit gebaut.",
    author: "Team Pflegefond",
    accent: "border-accent-impact",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-spacing">
      <div className="container-strict">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">
            04 / Community
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight">
            Social Proof
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`bg-background p-6 md:p-8 border-l-4 ${t.accent}`}
            >
              <p className="text-foreground leading-relaxed text-base italic">
                "{t.quote}"
              </p>
              <footer className="mt-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                – {t.author}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
