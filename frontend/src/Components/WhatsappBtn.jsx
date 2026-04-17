import whatsapp from "../assets/whatsapp.webp"

const WhatsappBtn = () => {
  return (
        <div className="max-w-5xl mx-auto mb-6 px-0 md:px-0">
          <a
            href="https://whatsapp.com/channel/0029VbCMkBc9RZATvADmza08"
            target="_blank"
            rel="noopener noreferrer"
            className="block group overflow-hidden rounded-xl md:rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95"
          >
            <img
              src={whatsapp}
              alt="Join WhatsApp Group"
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </a>
        </div>
  )
}

export default WhatsappBtn
