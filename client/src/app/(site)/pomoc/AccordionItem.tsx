import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import parse from "html-react-parser";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AccordionItem({
  title,
  id,
  content,
  handleToggleOpen,
  activeIndex,
}: any) {
  return (
    <div className="border-theme-dark border-b-2">
      <div
        onClick={() => handleToggleOpen(id)}
        className="flex justify-between items-center p-4 cursor-pointer"
      >
        <h2 className="text-xl text-theme-pink font-bold">{title}</h2>
        {activeIndex === id ? <AiOutlineMinus /> : <AiOutlinePlus />}
      </div>

      <AnimatePresence initial={false}>
        {activeIndex === id && (
          <motion.div
            className="flex flex-col lg:flex-row justify-between px-4 overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-3">{parse(content)}</div>

            <div className="flex items-end relative top-1">
              <Image
                src={"/ilust.png"} // make illustrations dynamic ❗❗❗
                alt="ilustracia psik"
                width={150}
                height={168}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
