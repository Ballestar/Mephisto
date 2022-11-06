import React from 'react'
import yargs, { locale } from 'yargs'
import { hideBin } from 'yargs/helpers'
import { Client } from '@xmtp/xmtp-js'
import { render, Text } from 'ink'
import { MessageList, MessageStream, Message } from './renderers'

import {
  loadBIGDADDY,
  loadLITTLEBOY,
  LITTLEBOY_LOCATION,
  loadMephisto,
  loadApiKey,
  loadWallet,
  saveRandomWallet,
  truncateEthAddress,
  WALLET_FILE_LOCATION,
} from './utils'
import { ethers, Wallet, utils } from 'ethers'
import abi from './Trustee.json'
import { readFileSync } from 'fs'

yargs(hideBin(process.argv))
  .command(
    'init',
    'Initialize wallet',
    {
      //littleboy: { type: 'string', demand: true },
      /*payload: { type: 'string', demand: true },*/
    },
    async (argv: any) => {
      const { /*littleboy,*/ payload, env } = argv
      const client = await Client.create(loadBIGDADDY(), { env })
      const contractABI = abi.abi
      console.log(contractABI)
      const provider = new ethers.providers.WebSocketProvider(
        `wss://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_WEBSOCKET}`
      )
      const signer = provider.getSigner(client.address)
      const contract = new ethers.Contract(
        '0xa54859A400cbB24716D18dB0093bD5A7b9f8fDFa',
        contractABI,
        signer
      )
      const existing = readFileSync(LITTLEBOY_LOCATION)
      const conversation = await client.conversations.newConversation(await Wallet.fromMnemonic(existing.toString()).getAddress())
      const sent = await conversation.send("WHOAMI")
      render(<Message {...sent} />)
      contract.on('Withdraw', async () => {
        const existing = readFileSync(LITTLEBOY_LOCATION)
        const conversation = await client.conversations.newConversation(await Wallet.fromMnemonic(existing.toString()).getAddress())
        const sent = await conversation.send("WHOAMI")
        render(<Message {...sent} />)
        console.log('Mephistopheles has been repaid')
      })
      render(
        <Text>
          Enrolled {client.address}
          Mephistopheles is at your service
        </Text>
      )
    }
  )

  // for testing, no prod use
  .command('BIGDADDY', 'Initialize wallet', {}, async (argv: any) => {
    const { env } = argv
    const client = await Client.create(loadBIGDADDY(), { env })

    const provider = new ethers.providers.AlchemyProvider(
      'goerli',
      loadApiKey()
    )

    render(
      <Text>
        New wallet with address {client.address} saved at {WALLET_FILE_LOCATION}
      </Text>
    )
  })

  // for testing, no prod use
  .command('LITTLEBOY', 'Initialize wallet', {}, async (argv: any) => {
    const { env } = argv
    const client = await Client.create(loadLITTLEBOY(), { env })

    render(
      <Text>
        New wallet with address {client.address} saved at {WALLET_FILE_LOCATION}
      </Text>
    )
  })
  .command('Withdraw', 'call ableToWithdraw', {}, async (argv: any) => {
    const { env } = argv
    const client = await Client.create(loadLITTLEBOY(), { env })
    const provider = new ethers.providers.AlchemyProvider(
      'optimism-goerli',
      process.env.ALCHEMY_WEBSOCKET
    )
    let path = "m/44'/60'/0'/0/0"
    const mneumonic =
      'swallow license seed summer stadium accident maximum term cushion roof blood detect'
    const providerWithWallet = new ethers.Wallet(
      '5b513444a764686dd26f98ed00626ebaa0ae4b0453fb43f2519b83943aad07ac',
      provider
    )
    const contractABI = abi.abi

    const contract = new ethers.Contract(
      '0xa54859A400cbB24716D18dB0093bD5A7b9f8fDFa',
      contractABI,
      providerWithWallet
    )
    await contract.ableToWithdraw()
    render(<Text>little boy try to withdraw money from {client.address}</Text>)
  })
  .command(
    'send <address> <message>',
    'Send a message to a blockchain address',
    {
      address: { type: 'string', demand: true },
      message: { type: 'string', demand: true },
    },
    async (argv: any) => {
      const { env, message, address } = argv
      const client = await Client.create(loadWallet(), { env })
      const conversation = await client.conversations.newConversation(address)
      const sent = await conversation.send(message)
      render(<Message {...sent} />)
    }
  )
  .command(
    'list-messages <address>',
    'List all messages from an address',
    { address: { type: 'string', demand: true } },
    async (argv: any) => {
      const { env, address } = argv
      const client = await Client.create(loadWallet(), { env })
      const conversation = await client.conversations.newConversation(address)
      const messages = await conversation.messages()
      const title = `Messages between ${truncateEthAddress(
        client.address
      )} and ${truncateEthAddress(conversation.peerAddress)}`

      render(<MessageList title={title} messages={messages} />)
    }
  )
  .command(
    'stream-all',
    'Stream messages coming from any address',
    {},
    async (argv: any) => {
      const { env } = argv
      const client = await Client.create(loadWallet(), { env })
      const stream = await client.conversations.streamAllMessages()

      render(<MessageStream stream={stream} title="Streaming messages" />)
    }
  )
  .command(
    'stream <address>',
    'Stream messages from an address',
    { address: { type: 'string', demand: true } },
    async (argv: any) => {
      const { address, env } = argv
      const client = await Client.create(loadWallet(), { env })
      const convo = await client.conversations.newConversation(address)
      const stream = await convo.streamMessages()

      render(
        <MessageStream
          stream={stream}
          title={`Streaming messages from ${argv.address}`}
        />
      )
    }
  )
  .option('env', {
    alias: 'e',
    type: 'string',
    default: 'dev',
    choices: ['dev', 'production'] as const,
    description: 'The XMTP environment to use',
  })
  .demandCommand(1)
  .parse()
