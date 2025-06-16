'use client'
import React from 'react';
import { Users, Globe2, FileText, Star, ArrowRightFromLine, ArrowRight, SquareArrowOutUpRight } from 'lucide-react';
import { ClassCard } from '@/components/ClassCard';
import { TemplateCard } from '@/components/TemplateCard';
import { languages } from '@/data/languages';
import { cn } from '@/utils/utils';
import Form from '@/components/Form';
import WordsAndImage from '@/components/templates/WordsAndImage';
import OrderText from '@/components/templates/OrderText';
import CompleteText from '@/components/templates/CompleteText';
import SelectQuestions from '@/components/templates/OrderLargeText';
import OrderColumn from '@/components/templates/OrderColumn';



const mockClasses = [
  {
    id: '1',
    name: 'English for Beginners',
    description: 'Introduction to English language basics',
    students: 15,
    language: languages[0],
    level: 'A1',
    schedule: [
      { day: 'Monday', time: '10:00' },
      { day: 'Wednesday', time: '10:00' }
    ]
  },
  {
    id: '2',
    name: 'Intermediate Spanish',
    description: 'Conversational Spanish and grammar',
    students: 12,
    language: languages[1],
    level: 'B1',
    schedule: [
      { day: 'Tuesday', time: '15:00' },
      { day: 'Thursday', time: '15:00' }
    ]
  },
  {
    id: '2',
    name: 'Intermediate Spanish',
    description: 'Conversational Spanish and grammar',
    students: 12,
    language: languages[1],
    level: 'B1',
    schedule: [
      { day: 'Tuesday', time: '15:00' },
      { day: 'Thursday', time: '15:00' }
    ]
  },
  {
    id: '2',
    name: 'Intermediate Spanish',
    description: 'Conversational Spanish and grammar',
    students: 12,
    language: languages[1],
    level: 'B1',
    schedule: [
      { day: 'Tuesday', time: '15:00' },
      { day: 'Thursday', time: '15:00' }
    ]
  },
  {
    id: '2',
    name: 'Intermediate Spanish',
    description: 'Conversational Spanish and grammar',
    students: 12,
    language: languages[1],
    level: 'B1',
    schedule: [
      { day: 'Tuesday', time: '15:00' },
      { day: 'Thursday', time: '15:00' }
    ]
  },
  {
    id: '2',
    name: 'Intermediate Spanish',
    description: 'Conversational Spanish and grammar',
    students: 12,
    language: languages[1],
    level: 'B1',
    schedule: [
      { day: 'Tuesday', time: '15:00' },
      { day: 'Thursday', time: '15:00' }
    ]
  },



];

const mockTemplates = [
  {
    id: '1',
    title: 'Basic Greetings and Introductions',
    description: 'Learn essential conversation starters',
    type: 'conversation',
    language: languages[0],
    level: 'A1',
    activities: []
  },
  {
    id: '2',
    title: 'Present Tense Verbs',
    description: 'Master regular and irregular verbs',
    type: 'grammar',
    language: languages[1],
    level: 'A2',
    activities: []
  }
];
const HorizontalCard = ({ icon, title, description }) => {
  return (
    <div className="flex border border-gray-300 rounded-lg overflow-hidden shadow-md">
      {/* Icon Section */}
      <div className="flex items-center justify-center bg-blue-100 w-1/3 p-4">
        {icon}
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-center w-2/3 p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};


// Ejemplo de uso:
// import { YourIconComponent } from "react-icons/your-icon-library";
// <HorizontalCard 
//   icon={<YourIconComponent />} 
//   title="Card Title" 
//   description="This is a description of the card." 
// />

// Array de objetos para alimentar el componente:
const cardData = [
  {
    icon: <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-blue-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' /></svg>,
    title: "Success",
    description: "This indicates a successful operation."
  },
  {
    icon: <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /></svg>,
    title: "Error",
    description: "This indicates an error occurred."
  },
  {
    icon: <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-yellow-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z' /></svg>,
    title: "Warning",
    description: "This is a warning message."
  },
];

// Uso del array para renderizar múltiples tarjetas:

function Subtitle({ title, icon }) {
  return <div className='flex my-4  '>
    {icon}
    <h2 className="text-xl font-semibold  text-black px-5 bg-[#FEAB5F] ml-5  rounded-b-xl rounded-tl-xl">{title} </h2>
  </div>
}


export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-[80px]">
      <div className='grid grid-cols-3 gap-5'>
        {cardData.map((card, index) => (
          <Form
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <WordsAndImage />
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <OrderText />
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <CompleteText />
      <br /><br /><br /><br /><br /><br /><br /><br /><br />

      <SelectQuestions question={'esta es la pregunta?'} options={['text1', 'text2']} />
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <OrderColumn spanishWords={['hola', 'que', 'como']} englishWords={['hola', 'que', 'como']} />

      <div className="space-y-8">
        <section>
          <Subtitle
            icon={<ArrowRight className="relative text- font-semibold  text-black bg-[#FEAB5F] rounded-full" />}
            title={'Web site'}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

            <StatCard
              title="Teachers"
              // value="27"
              icon={<Users className="h-6 w-6" />}
              // trend="+5"
              trendDirection="up"
            />

            <StatCard
              title="Reseñas"
              // value="92%"
              icon={<Star className="h-6 w-6" />}
              // trend="+5%"
              trendDirection="up"
            />
            <StatCard
              title="Contactos"
              // value="92%"
              icon={<Star className="h-6 w-6" />}
              // trend="+5%"
              trendDirection="up"
            />
            <StatCard
              title="Sobre nosotros"
              // value="27"
              icon={<Users className="h-6 w-6" />}
              // trend="+5"
              trendDirection="up"
            />
          </div>
        </section>
        <section>
          <Subtitle
            icon={<ArrowRight className="relative text- font-semibold  text-black bg-[#FEAB5F] rounded-full" />}
            title={'Estudiantes'}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

            <StatCard
              title="Total Students"
              value="27"
              icon={<Users className="h-6 w-6" />}
              trend="+5"
              trendDirection="up"
            />

            <StatCard
              title="Student Progress"
              value="92%"
              icon={<Star className="h-6 w-6" />}
              trend="+5%"
              trendDirection="up"
            />
          </div>
        </section>

        <section>
          <Subtitle
            icon={<ArrowRight className="relative text- font-semibold  text-black bg-[#FEAB5F] rounded-full" />}
            title={'Clases'}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockClasses.map((classItem) => (
              <ClassCard key={classItem.id} className={classItem} />
            ))}
          </div>
        </section>

        <section>
          <Subtitle
            icon={<ArrowRight className="relative text- font-semibold  text-black bg-[#FEAB5F] rounded-full" />}
            title={'Plantillas'}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}



function StatCard({ title, value, icon, trend, trendDirection }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <div className="flex items-center justify-between">
        <div className="text-gray-800">{title}</div>
        <div className="text-blue-600">{icon}</div>
      </div>
      <div className="mt-2 flex items-baseline">
        <div className="text-2xl font-semibold text-[#FEAB5F]">{value}</div>
        <span className={cn(
          "ml-2 text-sm",
          trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
        )}>
          {trend}
        </span>
      </div>
    </div>
  );
}