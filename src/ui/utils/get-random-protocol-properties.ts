import { getRandomArrayElement, getRandomObjectKey } from "./random-utils";
import { ProtocolsProperties } from "../resources/nodes-protocol-properties";

export function getRandomProtocolNetworkPair() {
    const protocol = getRandomObjectKey(ProtocolsProperties);
    const network = getRandomArrayElement(ProtocolsProperties[protocol]);

    return { protocol, network };
}