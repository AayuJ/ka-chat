import Layout from '@/components/layout/Layout'
import ChatArea from '@/components/chat/ChatArea'

export default function Home() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-center mb-8">
        Parental Leave Policy Inquiry
      </h1>
      <ChatArea />
    </Layout>
  )
}
