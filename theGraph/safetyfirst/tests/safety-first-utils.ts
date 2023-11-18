import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Claimed,
  DisasterRegistered,
  OccurrenceChanged,
  OwnershipTransferred,
  TokenChanged
} from "../generated/SafetyFirst/SafetyFirst"

export function createClaimedEvent(victim: Address, amount: BigInt): Claimed {
  let claimedEvent = changetype<Claimed>(newMockEvent())

  claimedEvent.parameters = new Array()

  claimedEvent.parameters.push(
    new ethereum.EventParam("victim", ethereum.Value.fromAddress(victim))
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return claimedEvent
}

export function createDisasterRegisteredEvent(
  disasterId: BigInt,
  status: boolean,
  disaster: ethereum.Tuple
): DisasterRegistered {
  let disasterRegisteredEvent = changetype<DisasterRegistered>(newMockEvent())

  disasterRegisteredEvent.parameters = new Array()

  disasterRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "disasterId",
      ethereum.Value.fromUnsignedBigInt(disasterId)
    )
  )
  disasterRegisteredEvent.parameters.push(
    new ethereum.EventParam("status", ethereum.Value.fromBoolean(status))
  )
  disasterRegisteredEvent.parameters.push(
    new ethereum.EventParam("disaster", ethereum.Value.fromTuple(disaster))
  )

  return disasterRegisteredEvent
}

export function createOccurrenceChangedEvent(
  disasterId: BigInt,
  occurrence: boolean
): OccurrenceChanged {
  let occurrenceChangedEvent = changetype<OccurrenceChanged>(newMockEvent())

  occurrenceChangedEvent.parameters = new Array()

  occurrenceChangedEvent.parameters.push(
    new ethereum.EventParam(
      "disasterId",
      ethereum.Value.fromUnsignedBigInt(disasterId)
    )
  )
  occurrenceChangedEvent.parameters.push(
    new ethereum.EventParam(
      "occurrence",
      ethereum.Value.fromBoolean(occurrence)
    )
  )

  return occurrenceChangedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTokenChangedEvent(newToken: Address): TokenChanged {
  let tokenChangedEvent = changetype<TokenChanged>(newMockEvent())

  tokenChangedEvent.parameters = new Array()

  tokenChangedEvent.parameters.push(
    new ethereum.EventParam("newToken", ethereum.Value.fromAddress(newToken))
  )

  return tokenChangedEvent
}
